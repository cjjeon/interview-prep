class AppConfig:
    secret_key = 'ThisIsTheSecretKey'
    jwt_payload = 'jwt_payload'


class Auth0Config:
    callback_url = 'http://localhost:5000/callback'
    client_id = ""
    client_secret = ""
    base_url = ''
    login_redirect_url = 'http://localhost:3000/company'
    logout_redirect_url = 'http://localhost:3000'


class DbConfig:
    host = 'localhost'
    port = '5432'
    user = 'postgres'
    password = 'postgres'
    db = 'postgres'

    @classmethod
    def generate_url(cls) -> str:
        return f'postgresql://{cls.user}:{cls.password}@{cls.host}:{cls.port}/{cls.db}'
