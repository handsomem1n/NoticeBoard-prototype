from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///notices.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

from routes import *

# 애플리케이션 컨텍스트 설정 및 db 초기화
with app.app_context():
    # db 초기화
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
