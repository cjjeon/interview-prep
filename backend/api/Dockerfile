FROM python:3.9-slim

WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

COPY ./src .

ENV FLASK_APP=main.py
ENV FLASK_ENV=production

CMD [ "python3", "main.py"]
