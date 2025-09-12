from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

@app.route('/')
@app.route('/register')
def index():
    return render_template('register.html')

connect = sqlite3.connect('users.db')
connect.execute(
    '''CREATE TABLE IF NOT EXISTS "registration" (
    "firstName"	TEXT NOT NULL,
    "lastName"	TEXT NOT NULL,
    "email"	TEXT NOT NULL,
    "phoneNumber"	INTEGER NOT NULL,
    "address"	TEXT NOT NULL,
    "landmark"	TEXT NOT NULL,
    "username"	TEXT NOT NULL,
    "password"	TEXT NOT NULL,
    "confirmPassword"	TEXT NOT NULL
    );'''
)

@app.route('/join', methods=['GET', 'POST'])
def join():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        city = request.form['city']
        country = request.form['country']
        phone = request.form['phone']
        with sqlite3.connect("database.db") as users:
            cursor = users.cursor()
            cursor.execute("INSERT INTO PARTICIPANTS \
            (name,email,city,country,phone) VALUES (?,?,?,?,?)",
                           (name, email, city, country, phone))
            users.commit()
        return render_template("index.html")
    else:
        return render_template('join.html')

@app.route('/participants')
def participants():
    connect = sqlite3.connect('database.db')
    cursor = connect.cursor()
    cursor.execute('SELECT * FROM PARTICIPANTS')

    data = cursor.fetchall()
    return render_template("participants.html", data=data)


if __name__ == '__main__':
    app.run(debug=False)

# from flask import Flask, render_template, request, redirect, url_for, session, flash
# import sqlite3
# import os
# from werkzeug.security import generate_password_hash, check_password_hash

# app = Flask(__name__, template_folder='3rd practical')

# # Secret key for session
# app.secret_key = os.urandom(24)

# # Database setup
# def init_db():
#     conn = sqlite3.connect('plant_rescue.db')
#     conn.execute('''
#     CREATE TABLE IF NOT EXISTS USERS (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         first_name TEXT NOT NULL,
#         last_name TEXT NOT NULL,
#         email TEXT UNIQUE NOT NULL,
#         phone TEXT NOT NULL,
#         address TEXT NOT NULL,
#         landmark TEXT,
#         username TEXT UNIQUE NOT NULL,
#         password TEXT NOT NULL,
#         newsletter INTEGER DEFAULT 0
#     )
#     ''')
    
#     conn.execute('''
#     CREATE TABLE IF NOT EXISTS PLANT_RESCUES (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         user_id INTEGER,
#         plant_name TEXT NOT NULL,
#         quantity INTEGER NOT NULL,
#         date_rescued TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#         FOREIGN KEY (user_id) REFERENCES USERS (id)
#     )
#     ''')
#     conn.commit()
#     conn.close()

# # Initialize database on startup
# init_db()

# # Routes
# @app.route('/')
# @app.route('/index.html')
# def index():
#     return render_template('index.html')

# @app.route('/browse/index.html')
# def browse():
#     return render_template('browse/index.html')

# @app.route('/browse/<category>.html')
# def category(category):
#     return render_template(f'browse/{category}.html')

# @app.route('/auth/register.html', methods=['GET', 'POST'])
# def register():
#     if request.method == 'POST':
#         first_name = request.form['firstName']
#         last_name = request.form['lastName']
#         email = request.form['email']
#         phone = request.form['phoneNumber']
#         address = request.form['address']
#         landmark = request.form['landmark']
#         username = request.form['username']
#         password = request.form['password']
#         confirm_password = request.form['confirmPassword']
#         newsletter = 1 if 'newsletterCheck' in request.form else 0
        
#         # Validate form data
#         if not all([first_name, last_name, email, phone, address, username, password]):
#             flash('All required fields must be filled out')
#             return render_template('auth/register.html')
        
#         if password != confirm_password:
#             flash('Passwords do not match')
#             return render_template('auth/register.html')
        
#         # Hash the password
#         hashed_password = generate_password_hash(password)
        
#         # Connect to database
#         try:
#             conn = sqlite3.connect('plant_rescue.db')
#             cursor = conn.cursor()
            
#             # Check if username or email already exists
#             cursor.execute('SELECT * FROM USERS WHERE username = ? OR email = ?', (username, email))
#             existing_user = cursor.fetchone()
            
#             if existing_user:
#                 flash('Username or email already exists')
#                 return render_template('auth/register.html')
                
#             # Insert new user
#             cursor.execute('''
#             INSERT INTO USERS (first_name, last_name, email, phone, address, landmark, username, password, newsletter)
#             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
#             ''', (first_name, last_name, email, phone, address, landmark, username, hashed_password, newsletter))
            
#             conn.commit()
#             flash('Registration successful! Please log in.')
#             return redirect(url_for('login'))
            
#         except sqlite3.Error as error:
#             flash(f'Database error: {error}')
#             return render_template('auth/register.html')
            
#         finally:
#             if conn:
#                 conn.close()
    
#     # GET request
#     return render_template('auth/register.html')

# @app.route('/auth/login.html', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         username = request.form['username']
#         password = request.form['password']
#         remember = 'rememberCheck' in request.form
        
#         # Connect to database
#         try:
#             conn = sqlite3.connect('plant_rescue.db')
#             cursor = conn.cursor()
            
#             # Find user
#             cursor.execute('SELECT * FROM USERS WHERE username = ?', (username,))
#             user = cursor.fetchone()
            
#             if user and check_password_hash(user[7], password):  # Index 7 is the password field
#                 # Set session
#                 session['user_id'] = user[0]  # Index 0 is the id field
#                 session['username'] = username
#                 session['first_name'] = user[1]  # Index 1 is the first_name field
                
#                 if remember:
#                     session.permanent = True
                
#                 flash('Login successful!')
#                 return redirect(url_for('index'))
#             else:
#                 flash('Invalid username or password')
#                 return render_template('auth/login.html')
                
#         except sqlite3.Error as error:
#             flash(f'Database error: {error}')
#             return render_template('auth/login.html')
            
#         finally:
#             if conn:
#                 conn.close()
    
#     # GET request
#     return render_template('auth/login.html')

# @app.route('/logout')
# def logout():
#     session.clear()
#     flash('You have been logged out')
#     return redirect(url_for('index'))

# @app.route('/my-rescues')
# def my_rescues():
#     if 'user_id' not in session:
#         flash('Please log in to view your rescues')
#         return redirect(url_for('login'))
        
#     try:
#         conn = sqlite3.connect('plant_rescue.db')
#         cursor = conn.cursor()
        
#         # Get user's rescues
#         cursor.execute('''
#         SELECT p.id, p.plant_name, p.quantity, p.date_rescued 
#         FROM PLANT_RESCUES p
#         WHERE p.user_id = ?
#         ORDER BY p.date_rescued DESC
#         ''', (session['user_id'],))
        
#         rescues = cursor.fetchall()
#         return render_template('my_rescues.html', rescues=rescues)
        
#     except sqlite3.Error as error:
#         flash(f'Database error: {error}')
#         return redirect(url_for('index'))
        
#     finally:
#         if conn:
#             conn.close()

# @app.route('/rescue-plant', methods=['POST'])
# def rescue_plant():
#     if 'user_id' not in session:
#         flash('Please log in to rescue plants')
#         return redirect(url_for('login'))
        
#     plant_name = request.form['plant_name']
#     quantity = request.form['quantity']
    
#     try:
#         conn = sqlite3.connect('plant_rescue.db')
#         cursor = conn.cursor()
        
#         # Record the rescue
#         cursor.execute('''
#         INSERT INTO PLANT_RESCUES (user_id, plant_name, quantity)
#         VALUES (?, ?, ?)
#         ''', (session['user_id'], plant_name, quantity))
        
#         conn.commit()
#         flash('Plant rescued successfully!')
#         return redirect(url_for('my_rescues'))
        
#     except sqlite3.Error as error:
#         flash(f'Database error: {error}')
#         return redirect(url_for('index'))
        
#     finally:
#         if conn:
#             conn.close()

# @app.route('/admin/users')
# def admin_users():
#     # This would typically have admin authentication
#     try:
#         conn = sqlite3.connect('plant_rescue.db')
#         cursor = conn.cursor()
        
#         cursor.execute('SELECT id, first_name, last_name, email, phone, username FROM USERS')
#         users = cursor.fetchall()
        
#         return render_template('admin_users.html', users=users)
        
#     except sqlite3.Error as error:
#         flash(f'Database error: {error}')
#         return redirect(url_for('index'))
        
#     finally:
#         if conn:
#             conn.close()

# @app.route('/admin/rescues')
# def admin_rescues():
#     # This would typically have admin authentication
#     try:
#         conn = sqlite3.connect('plant_rescue.db')
#         cursor = conn.cursor()
        
#         cursor.execute('''
#         SELECT p.id, u.username, p.plant_name, p.quantity, p.date_rescued
#         FROM PLANT_RESCUES p
#         JOIN USERS u ON p.user_id = u.id
#         ORDER BY p.date_rescued DESC
#         ''')
        
#         rescues = cursor.fetchall()
#         return render_template('admin_rescues.html', rescues=rescues)
        
#     except sqlite3.Error as error:
#         flash(f'Database error: {error}')
#         return redirect(url_for('index'))
        
#     finally:
#         if conn:
#             conn.close()

# if __name__ == '__main__':
#     app.run(debug=True)