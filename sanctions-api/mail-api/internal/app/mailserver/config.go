package mailserver

type Config struct {
	BindAddr string `toml:"bind_addr"`
	LogLevel string `toml:"log_level"`
}

func NewConfig() *Config {
	return &Config{
		BindAddr: ":7673",
		LogLevel: "debug",
	}
}
