#!/bin/bash
# Comprehensive Test Script for Async Endpoints (Tasks 10-13)
# Express Book Reviews Final Project

echo "========================================"
echo "Testing Async/Await Implementations"
echo "Express Book Reviews - Tasks 10-13"
echo "========================================"
echo ""

echo "Task 10: Get all books using async-await"
echo "Route: GET /async"
echo "----------------------------------------"
curl -X GET http://localhost:5000/async
echo -e "\n"

echo "========================================"
echo ""

echo "Task 11: Get book by ISBN using Promises"
echo "Route: GET /isbn-async/5"
echo "----------------------------------------"
curl -X GET http://localhost:5000/isbn-async/5
echo -e "\n"

echo "========================================"
echo ""

echo "Task 11: Error handling - Non-existent ISBN"
echo "Route: GET /isbn-async/999"
echo "----------------------------------------"
curl -X GET http://localhost:5000/isbn-async/999
echo -e "\n"

echo "========================================"
echo ""

echo "Task 12: Get books by author using async-await"
echo "Route: GET /author-async/Jane%20Austen"
echo "----------------------------------------"
curl -X GET "http://localhost:5000/author-async/Jane%20Austen"
echo -e "\n"

echo "========================================"
echo ""

echo "Task 12: Error handling - Non-existent Author"
echo "Route: GET /author-async/Nonexistent%20Author"
echo "----------------------------------------"
curl -X GET "http://localhost:5000/author-async/Nonexistent%20Author"
echo -e "\n"

echo "========================================"
echo ""

echo "Task 13: Get books by title using Promises"
echo "Route: GET /title-async/The%20Divine%20Comedy"
echo "----------------------------------------"
curl -X GET "http://localhost:5000/title-async/The%20Divine%20Comedy"
echo -e "\n"

echo "========================================"
echo ""

echo "Task 13: Error handling - Non-existent Title"
echo "Route: GET /title-async/Nonexistent%20Book"
echo "----------------------------------------"
curl -X GET "http://localhost:5000/title-async/Nonexistent%20Book"
echo -e "\n"

echo "========================================"
echo "All Tests Completed!"
echo "========================================"
