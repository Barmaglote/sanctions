package main

import (
	"barmaglote/mail-api/internal/app/mailserver"
	"flag"
	"log"

	"github.com/BurntSushi/toml"
)

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

	if err != nil {
		log.Fatal(err)
	}

	s := mailserver.New(config)
	if err := s.Start(); err != nil {
		log.Fatal(err)
	}
}
