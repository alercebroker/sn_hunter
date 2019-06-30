#!/usr/bin/env python
import sys

sys.path.append("..")
from front import app

if __name__ == "__main__":
    app.run(debug=True, port=8080)
