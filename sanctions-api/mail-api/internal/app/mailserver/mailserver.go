package mailserver

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type Msg struct {
	Category string `json:"Category"` // Cofirmation, Request and etc. TODO: enum
	Username string `json:"Username"` // Title, Username
	Email    string `json:"Email"`    // To
}

type health struct {
	Msg string `json:"Msg"`
}

var healthresponse = []health{
	{Msg: "Status is ok"},
}

type MailServer struct {
	config *Config
	logger *logrus.Logger
	router *gin.Engine
	queue  chan *Msg
}

func New(config *Config) *MailServer {
	return &MailServer{
		config: config,
		logger: logrus.New(),
		router: gin.Default(),
		queue:  make(chan *Msg, config.MailBufferSize),
	}
}

func (s *MailServer) Start() error {
	if err := s.configureLogger(); err != nil {
		return err
	}

	if err := s.configureRouter(); err != nil {
		return err
	}

	return http.ListenAndServe(s.config.BindAddr, s.router)
}

func (s *MailServer) configureLogger() error {
	level, err := logrus.ParseLevel(s.config.LogLevel)
	if err != nil {
		return err
	}

	s.logger.SetLevel(level)

	return nil
}

func (s *MailServer) configureRouter() error {
	// s.router.Use() // add middleware to check token
	s.router.GET("/v1/health", getStatus)
	s.router.POST("/v1/send", sendMessage(s))
	return nil
}

func getStatus(c *gin.Context) {
	c.JSON(http.StatusOK, healthresponse)
}

func sendMessage(s *MailServer) gin.HandlerFunc {
	go notify(s.queue, s.logger)

	return func(c *gin.Context) {
		var msg Msg
		if c.ShouldBind(&msg) == nil {
			s.queue <- &msg
		}
		c.String(200, "Success")
	}
}

func notify(c chan *Msg, logger *logrus.Logger) {
	for msg := range c {
		logger.Println(msg.Category)
		logger.Println(msg.Email)
		logger.Println(msg.Username)
	}
}
