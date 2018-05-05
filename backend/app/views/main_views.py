
from flask import Blueprint
from flask import request, url_for, g, jsonify, abort
from datetime import datetime

from app import db
from app import auth
from app.models.user_models import User
from app.models.wof_models import Wheeloflife

main_blueprint = Blueprint('main', __name__, template_folder='templates')

# The Home page is accessible to anyone
# @main_blueprint.route('/')

@auth.verify_password
def verify_password(username_or_token, password):
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(username=username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True


@main_blueprint.route('/api/users', methods=['POST'])
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        abort(400)    # missing arguments
    if User.query.filter_by(username=username).first() is not None:
        abort(400)    # existing user
    user = User(username=username)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return (jsonify({'username': user.username}), 201,
            {'Location': url_for('main.get_user', id=user.id, _external=True)})


@main_blueprint.route('/api/users/<int:id>')
def get_user(id):
    print("Request Recieve")
    print(User)
    print(db)
    user = User.query.get(id)
    print(user)
    if not user:
        abort(400)
    return jsonify({'username': user.username})


@main_blueprint.route('/api/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(60000)
    return jsonify({'token': token.decode('ascii'), 'duration': 600})


@main_blueprint.route('/api/resource')
@auth.login_required
def get_resource():
    return jsonify({'data': 'Hello, %s!' % g.user.username})

@main_blueprint.route('/api/user')
@auth.login_required
def get_user_data():
    return jsonify({'id':g.user.id})

@main_blueprint.route('/api/wheeloflife', methods=['POST','GET','PUT'])
def parse_request():
    if request.method == 'GET':
        userId = request.args.get('userId')
        wof = Wheeloflife.query.filter_by(userId=userId).first()
        if wof is not None:
            return jsonify(wof.to_json())
        else:
            return jsonify(None)
    id = request.json.get('id')
    userId = request.json.get('userId')
    blocks= request.json.get('blocks')
    data= request.json.get('data')
    currentState= request.json.get('currentState')
    status= request.json.get('status')
    version= request.json.get('version')
    if request.method == 'POST':
        wof = Wheeloflife(userId=userId,blocks=blocks,version=version,status="PENDING",createdDate= datetime.now(),currentState= currentState)
        db.session.add(wof)
        db.session.commit()
        return jsonify(wof.to_json())
    if request.method == 'PUT':
        wof = Wheeloflife.query.filter_by(id=id).first()
        wof.blocks=blocks
        wof.data=data
        wof.currentState = currentState
        wof.status = status
        wof.version = version
        db.session.add(wof)
        db.session.commit()
        return jsonify(wof.to_json())