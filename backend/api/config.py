class AppConfig:
    secret_key = 'ThisIsTheSecretKey'
    jwt_payload = 'jwt_payload'


class Auth0Config:
    callback_url = 'http://localhost:5000/callback'
    client_id = ""
    client_secret = ""
    base_url = ''


class DbConfig:
    host = 'localhost'
    port = '5432'
    user = 'postgres'
    password = 'postgres'
    db = 'postgres'

    @classmethod
    def generate_url(cls) -> str:
        return f'postgresql://{cls.user}:{cls.password}@{cls.host}:{cls.port}/{cls.db}'
