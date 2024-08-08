from flask import request, jsonify, render_template
from app import app, db
from models import Notice

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/api/notices', methods=['POST'])
def add_notice():
    data = request.get_json()
    new_notice = Notice(title=data['title'], content=data['content'])
    db.session.add(new_notice)
    db.session.commit()
    return jsonify({'message': '공지사항이 추가되었습니다'}), 201

@app.route('/api/notices', methods=['GET'])
def get_notices():
    notices = Notice.query.all()
    output = []
    for notice in notices:
        notice_data = {'id': notice.id, 'title': notice.title, 'content': notice.content}
        output.append(notice_data)
    return jsonify(output)
