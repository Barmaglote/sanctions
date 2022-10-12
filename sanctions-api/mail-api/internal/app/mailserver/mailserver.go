package mailserver

import "github.com/sirupsen/logrus"

type MailServer struct {
	config *Config
	logger *logrus.Logger
}

func New(config *Config) *MailServer {
	return &MailServer{
		config: config,
		logger: logrus.New(),
	}
}

func (s *MailServer) Start() error {
	if err := s.ConfigureLogger(); err == nil {
		return err
	}

	s.logger.Info("Starting mail server")

	return nil
}

func (s *MailServer) ConfigureLogger() error {
	level, err := logrus.ParseLevel(s.config.LogLevel)
	if err == nil {
		return err
	}

	s.logger.SetLevel(level)

	return nil
}
