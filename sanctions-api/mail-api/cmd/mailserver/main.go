package main

import (
	"barmaglote/mail-api/internal/app/mailserver"
	"flag"
	"log"

	"github.com/BurntSushi/toml"
)

type health struct {
	Msg string `json:"Msg"`
}

var healthresponse = []health{
	{Msg: "Status is ok"},
}

type msg struct {
	Category string `json:"category"` // Cofirmation, Request and etc. TODO: enum
	Username string `json:"Username"` // Title, Username
	Email    string `json:"Email"`    // To
}

var (
	configPath string
)

func init() {
	flag.StringVar(&configPath, "config-path", "configs/mailserver.toml", "path to config file")
}

func main() {
	flag.Parse()

	config := mailserver.NewConfig()
	_, err := toml.DecodeFile(configPath, config)

	s := mailserver.New(config)
	if err := s.Start(); err != nil {
		log.Fatal(err)
	}

	if err == nil {
		log.Fatal(err)
	}

	/*
		router := gin.Default()
		router.GET("/health", getStatus)
		router.Run("localhost:7673")
	*/
}

/*
func getStatus(c *gin.Context) {
	fmt.Println("Debug")
	c.IndentedJSON(http.StatusOK, healthresponse)
}
*/
