import os


class Auth0Config:
    AUTH0_DOMAIN = os.environ.get("AUTH0_DOMAIN", 'https://something.auth0.com/')
    AUTH0_AUDIENCE = os.environ.get("AUTH0_AUDIENCE", 'https://something.auth0.com/api/v2/')
    AUTH0_ALGORITHMS = ['RS256']


class DbConfig:
    host = 'localhost'
    port = '5432'
    user = 'postgres'
    password = 'postgres'
    db = 'postgres'

    @classmethod
    def generate_url(cls) -> str:
        return f'postgresql://{cls.user}:{cls.password}@{cls.host}:{cls.port}/{cls.db}'
