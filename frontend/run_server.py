#!/usr/bin/env python3
import os
import webbrowser
import time
from http.server import HTTPServer, SimpleHTTPRequestHandler

os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8000
URL = f"http://localhost:{PORT}"

print("\n" + "="*50)
print("Hand Gesture Recognition System")
print("="*50)
print(f"Starting server on {URL}")
print("="*50 + "\n")

# Open browser
time.sleep(1)
webbrowser.open(URL)

# Start server
server = HTTPServer(('0.0.0.0', PORT), SimpleHTTPRequestHandler)
print(f"✓ Server running on {URL}")
print("Press Ctrl+C to stop\n")

try:
    server.serve_forever()
except KeyboardInterrupt:
    print("\n✓ Server stopped")
