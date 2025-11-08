import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

try:
    # Connect to database
    conn = psycopg2.connect(os.getenv('DATABASE_URL'))
    cur = conn.cursor()
    
    # Test if table exists
    cur.execute("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')")
    table_exists = cur.fetchone()[0]
    
    if table_exists:
        print("✅ Table 'users' exists!")
        
        # Try inserting a test user
        cur.execute(
            "INSERT INTO users (name, email, phone, address, password) VALUES (%s, %s, %s, %s, %s)",
            ('Test User', 'test@example.com', '1234567890', 'Test Address', 'password123')
        )
        conn.commit()
        print("✅ Test user inserted successfully!")
        
        # Clean up - delete test user
        cur.execute("DELETE FROM users WHERE email = 'test@example.com'")
        conn.commit()
        print("✅ Test user deleted (cleanup)")
    else:
        print("❌ Table 'users' does NOT exist!")
        print("Please create the table in Neon SQL Editor")
    
    cur.close()
    conn.close()
    
except Exception as e:
    print(f"❌ Error: {e}")
    print(f"Error type: {type(e).__name__}")
