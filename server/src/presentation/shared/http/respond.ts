/*
MIT License

Copyright (c) 2026, all rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { Response } from 'express';

type ErrorBody = {
	error: string;
	details?: unknown;
};

export const respondWithSuccess = <T>(response: Response, body: T, statusCode = 200) => {
	return response.status(statusCode).json(body);
};

export const respondWithCreated = <T>(response: Response, body: T) => {
	return respondWithSuccess(response, body, 201);
};

export const respondWithBadRequest = (response: Response, error: string, details?: unknown) => {
	const body: ErrorBody = details === undefined ? { error } : { error, details };
	return response.status(400).json(body);
};

export const respondWithUnauthorized = (response: Response, error = 'Unauthorized', details?: unknown) => {
	const body: ErrorBody = details === undefined ? { error } : { error, details };
	return response.status(401).json(body);
};

export const respondWithForbidden = (response: Response, error = 'Forbidden', details?: unknown) => {
	const body: ErrorBody = details === undefined ? { error } : { error, details };
	return response.status(403).json(body);
};

export const respondWithNotFound = (response: Response, error = 'Not found', details?: unknown) => {
	const body: ErrorBody = details === undefined ? { error } : { error, details };
	return response.status(404).json(body);
};

export const respondWithConflict = (response: Response, error = 'Conflict', details?: unknown) => {
	const body: ErrorBody = details === undefined ? { error } : { error, details };
	return response.status(409).json(body);
};

export const respondWithInternalServerError = (
	response: Response,
	error = 'Internal server error',
	details?: unknown,
) => {
	const body: ErrorBody = details === undefined ? { error } : { error, details };
	return response.status(500).json(body);
};
