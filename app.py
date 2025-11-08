from flask import Flask, request, jsonify, render_template, session, redirect, url_for
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv
from functools import wraps

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'fallback-secret-key')

# -------------------------------------------
# DATABASE CONNECTION
# -------------------------------------------
def get_db_connection():
    try:
        conn = psycopg2.connect(
            os.getenv('DATABASE_URL'),
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as e:
        print(f"Database error: {e}")
        return None

# -------------------------------------------
# LOGIN REQUIRED DECORATOR
# -------------------------------------------
def login_required(f):
    """Decorator to protect routes - user must be logged in"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            # If accessing via browser, redirect to login page
            if request.accept_mimetypes.accept_html:
                return redirect(url_for('login_page'))
            # If accessing via API, return JSON error
            return jsonify({'success': False, 'message': 'Please login first'}), 401
        return f(*args, **kwargs)
    return decorated_function

# -------------------------------------------
# PUBLIC ROUTES (No Login Required)
# -------------------------------------------

@app.route('/')
def index():
    """Home page - public access"""
    return render_template('index.html')

@app.route('/register-page')
def register_page():
    """Registration page - public access"""
    return render_template('register.html')

@app.route('/login-page')
def login_page():
    """Login page - public access"""
    return render_template('login.html')

# -------------------------------------------
# PROTECTED ROUTES (Login Required)
# -------------------------------------------

@app.route('/explore')
@login_required
def explore():
    """Explore plants page - requires login"""
    user_name = session.get('user_name', 'User')
    return render_template('explore.html', user_name=user_name)

@app.route('/contact')
@login_required
def contact():
    """Contact page - requires login"""
    user_name = session.get('user_name', 'User')
    return render_template('contact.html', user_name=user_name)

@app.route('/help')
@login_required
def help_page():
    """Help page - requires login"""
    user_name = session.get('user_name', 'User')
    return render_template('help.html', user_name=user_name)

@app.route('/offer')
@login_required
def offer():
    """Offers page - requires login"""
    user_name = session.get('user_name', 'User')
    return render_template('offer.html', user_name=user_name)

@app.route('/reward')
@login_required
def reward():
    """Rewards page - requires login"""
    user_name = session.get('user_name', 'User')
    return render_template('reward.html', user_name=user_name)

@app.route('/track')
@login_required
def track():
    """Track order page - requires login"""
    user_name = session.get('user_name', 'User')
    return render_template('track.html', user_name=user_name)

# -------------------------------------------
# API ENDPOINTS
# -------------------------------------------

@app.route('/api/register', methods=['POST'])
def api_register():
    """API endpoint for registration"""
    try:
        data = request.get_json()
        
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone', '')
        address = data.get('address', '')
        password = data.get('password')
        
        print(f"📝 Registration attempt: {name} ({email})")
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'success': False, 'message': 'Database connection failed'}), 500
        
        cur = conn.cursor()
        
        # Check if email exists
        cur.execute('SELECT * FROM users WHERE email = %s', (email,))
        if cur.fetchone():
            cur.close()
            conn.close()
            return jsonify({'success': False, 'message': 'Email already registered'})
        
        # Insert user
        cur.execute(
            'INSERT INTO users (name, email, phone, address, password) VALUES (%s, %s, %s, %s, %s)',
            (name, email, phone, address, password)
        )
        conn.commit()
        cur.close()
        conn.close()
        
        print(f"✅ User registered: {name}")
        return jsonify({'success': True, 'message': f'Registration successful! Welcome {name}!'})
        
    except Exception as e:
        print(f"❌ Registration error: {e}")
        if 'conn' in locals() and conn:
            conn.rollback()
            conn.close()
        return jsonify({'success': False, 'message': 'Registration failed'}), 500

@app.route('/api/login', methods=['POST'])
def api_login():
    """API endpoint for login"""
    try:
        data = request.get_json()
        
        email = data.get('email')
        password = data.get('password')
        
        print(f"🔐 Login attempt: {email}")
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'success': False, 'message': 'Database connection failed'}), 500
        
        cur = conn.cursor()
        cur.execute(
            'SELECT * FROM users WHERE email = %s AND password = %s',
            (email, password)
        )
        user = cur.fetchone()
        cur.close()
        conn.close()
        
        if user:
            # Create session
            session['user_id'] = user['id']
            session['user_name'] = user['name']
            session['user_email'] = user['email']
            session.permanent = True
            
            print(f"✅ Login successful: {user['name']}")
            
            return jsonify({
                'success': True, 
                'message': f'Login successful! Welcome back, {user["name"]}!',
                'user': {'name': user['name'], 'email': user['email']}
            })
        else:
            print(f"❌ Invalid credentials for: {email}")
            return jsonify({'success': False, 'message': 'Invalid email or password'})
            
    except Exception as e:
        print(f"❌ Login error: {e}")
        if 'conn' in locals() and conn:
            conn.close()
        return jsonify({'success': False, 'message': 'Login failed'}), 500

@app.route('/api/logout', methods=['POST'])
def api_logout():
    """Logout endpoint"""
    user_name = session.get('user_name', 'User')
    session.clear()
    print(f"👋 User logged out: {user_name}")
    return jsonify({'success': True, 'message': 'Logged out successfully'})

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    """Check if user is authenticated"""
    if 'user_id' in session:
        return jsonify({
            'authenticated': True,
            'user': {
                'name': session.get('user_name'),
                'email': session.get('user_email')
            }
        })
    return jsonify({'authenticated': False})

# -------------------------------------------
# LOGOUT ROUTE (Browser)
# -------------------------------------------
@app.route('/logout')
def logout():
    """Logout route for browser redirect"""
    user_name = session.get('user_name', 'User')
    session.clear()
    print(f"👋 User logged out via browser: {user_name}")
    return redirect(url_for('login_page'))

# -------------------------------------------
# ERROR HANDLERS
# -------------------------------------------
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html') if os.path.exists('templates/404.html') else "404 - Page Not Found", 404

# -------------------------------------------
# RUN THE APP
# -------------------------------------------
if __name__ == '__main__':
    print("🌿 Nursery App Starting...")
    print("📊 Database: Connected to Neon PostgreSQL")
    print("🔗 Server: http://127.0.0.1:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)
