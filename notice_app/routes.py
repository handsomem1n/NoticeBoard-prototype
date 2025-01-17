from flask import Flask, request, jsonify, render_template
from app import app, db
from models import Notice

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/출고')
def 출고():
    return render_template('출고.html')

@app.route('/입고')
def 입고():
    return render_template('입고.html')

@app.route('/반출')
def 반출():
    return render_template('반출.html')

@app.route('/이벤트')
def 이벤트():
    return render_template('이벤트.html')

@app.route('/api/notices', methods=['POST'])
def add_notice():
    data = request.get_json()
    new_notice = Notice(title=data['title'], content=data['content'])
    db.session.add(new_notice)
    db.session.commit()
    return jsonify({'message': '공지사항이 추가되었습니다'}), 201

@app.route('/api/notices/<int:id>', methods=['DELETE'])
def delete_notice(id):
    notice = Notice.query.get_or_404(id)
    db.session.delete(notice)
    db.session.commit()
    return jsonify({'message': '공지사항이 삭제되었습니다'}), 200


@app.route('/api/notices', methods=['GET'])
def get_notices():
    notices = Notice.query.all()
    output = []
    for notice in notices:
        notice_data = {'id': notice.id, 'title': notice.title, 'content': notice.content}
        output.append(notice_data)
    return jsonify(output)
