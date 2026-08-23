#!/usr/bin/env python3
"""Serve the Elio Corp site from this folder only (not the AI-Pet repo root)."""

from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PORT = 5173


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Serving Elio Corp from {ROOT}")
    print(f"Open http://127.0.0.1:{PORT}")
    server.serve_forever()
