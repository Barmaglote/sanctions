package mailserver

import (
	"bytes"
	"html/template"
	"log"
	"net/http"
	"strings"

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
	tmpls  map[string]*template.Template
}

func New(config *Config) *MailServer {
	return &MailServer{
		config: config,
		logger: logrus.New(),
		router: gin.Default(),
		queue:  make(chan *Msg, config.MailBufferSize),
		tmpls:  map[string]*template.Template{},
	}
}

func (s *MailServer) Start() error {
	if err := s.configureLogger(); err != nil {
		return err
	}

	if err := s.configureTemplates(); err != nil {
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

func (s *MailServer) configureTemplates() error {
	for _, item := range s.config.Templates {
		files := make([]string, 0)
		var sb strings.Builder

		for _, file := range item.Files {
			sb.Reset()
			sb.WriteString(s.config.TemplateFolder)
			sb.WriteString(file)
			files = append(files, sb.String())
		}

		ts, err := template.ParseFiles(files...)

		if err != nil {
			s.logger.Error(err.Error())
			s.logger.Error("Unable to read file")
			return nil
		}

		s.tmpls[item.Name] = ts
	}

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
	go notify(s.queue, s)

	return func(c *gin.Context) {
		var msg Msg
		if c.ShouldBind(&msg) == nil {
			s.queue <- &msg
		}
		c.String(200, "Success")
	}
}

func notify(c chan *Msg, s *MailServer) {
	for msg := range c {
		s.logger.Error(msg.Category)
		tmpl := s.tmpls[msg.Category]

		if tmpl == nil {
			s.logger.Error("Unable to find template")
			return
		}

		message := ""
		buf := bytes.NewBufferString(message)
		err := tmpl.Execute(buf, msg)

		if err != nil {
			log.Println(err.Error())
			s.logger.Error("Unable to parse")
		}

		s.logger.Info(buf)
	}
}
