from flask import Flask, render_template, request, redirect, url_for, session, send_from_directory
import sqlite3
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

# Use environment variable for secret key in production, fallback for development
app.secret_key = os.environ.get('SECRET_KEY', '1234567890-change-this-in-production')


# Static files are automatically served by Flask from /static/ directory
# No need for custom routes





def get_db_path():
    """Get the database path, ensuring it's in a writable location for Render"""
    if os.environ.get('RENDER'):
        # On Render, use /tmp for writable storage (note: this is temporary)
        return '/tmp/database.db'
    else:
        # Local development
        return 'database.db'

def init_database():
    """Initialize the database and create tables if they don't exist"""
    try:
        db_path = get_db_path()
        connection = sqlite3.connect(db_path)
        cursor = connection.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                phone TEXT,
                address TEXT,
                password TEXT NOT NULL
            )
        ''')

        connection.commit()
        connection.close()
        print(f"Database and users table created successfully at {db_path}!")
    except Exception as e:
        print(f"Error initializing database: {e}")

# Initialize database when the app starts
init_database()

@app.route('/')
def home():
    # Check if user is logged in and serve appropriate content
    if 'user_id' in session:
        return f"<h1>Welcome back, {session['user_name']}!</h1> <p><a href='/logout'>Logout</a> | <a href='/'>Go to Main Site</a></p>"
    else:
      
        return render_template('index.html')
        try:
            with open('index.html', 'r', encoding='utf-8') as f:
                return f.read()
        except FileNotFoundError:
            return "<h1>Welcome to the Nursery App!</h1> <p><a href='/register'>Register</a> | <a href='/login'>Login</a></p>"

# Route to display the registration form
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Get form data
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        address = request.form['address']
        password = request.form['password']

        # Connect to database and insert user
        try:
            # Hash the password for security
            hashed_password = generate_password_hash(password)
            
            db_path = get_db_path()
            conn = sqlite3.connect(db_path)
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO users (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)",
                 (name, email, phone, address, hashed_password)
            )
            conn.commit()
            conn.close()
            return """
            <div style='text-align: center; padding: 50px; font-family: Arial, sans-serif;'>
                <h2 style='color: green;'>✅ Registration Successful!</h2>
                <p>Welcome to RESCUE99 Nursery, {}!</p>
                <p><a href='/login' style='background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Login Now</a></p>
                <p><a href='/' style='color: #333;'>← Back to Home</a></p>
            </div>
            """.format(name)
        except sqlite3.IntegrityError:
            # This will catch if the email already exists (due to UNIQUE constraint)
            return """
            <div style='text-align: center; padding: 50px; font-family: Arial, sans-serif;'>
                <h2 style='color: red;'>❌ Registration Failed</h2>
                <p>This email is already registered. Please try a different one.</p>
                <p><a href='/register' style='background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Try Again</a></p>
                <p><a href='/' style='color: #333;'>← Back to Home</a></p>
            </div>
            """

    # If it's a GET request, just show the form
    return render_template('register.html')



@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        db_path = get_db_path()
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, password FROM users WHERE email = ? ", (email,))
        user = cursor.fetchone()
        conn.close()

        if user and check_password_hash(user[2], password):
            session['user_id'] = user[0]
            session['user_name'] = user[1]
            return """
            <div style='text-align: center; padding: 50px; font-family: Arial, sans-serif;'>
                <h2 style='color: green;'>🎉 Welcome back, {}!</h2>
                <p>You have successfully logged in.</p>
                <p><a href='/' style='background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Go to Home</a></p>
                <p><a href='/logout' style='color: #333;'>Logout</a></p>
            </div>
            """.format(user[1])
        else:
            return """
            <div style='text-align: center; padding: 50px; font-family: Arial, sans-serif;'>
                <h2 style='color: red;'>❌ Login Failed</h2>
                <p>Invalid email or password. Please try again.</p>
                <p><a href='/login' style='background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Try Again</a></p>
                <p><a href='/register' style='color: #333;'>Don't have an account? Register here</a></p>
            </div>
            """

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    return """
    <div style='text-align: center; padding: 50px; font-family: Arial, sans-serif;'>
        <h2 style='color: #4CAF50;'>👋 Goodbye!</h2>
        <p>You have been successfully logged out.</p>
        <p><a href='/' style='background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Back to Home</a></p>
    </div>
    """


# Route for explore.html
@app.route('/explore/explore.html')
def explore():
    return render_template('explore.html')

# Route for find.html
@app.route('/explore/find.html')
def find():
    return render_template('../explore/find.html')

if __name__ == '__main__':
    # Only run in debug mode for local development
    debug_mode = not os.environ.get('RENDER')
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=debug_mode)

    