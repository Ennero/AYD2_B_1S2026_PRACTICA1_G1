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

import {
	StorageDatasource,
	StorageListedObject,
	StorageListInput,
	StorageRemoveInput,
	StorageRemoveOutput,
	StorageRepository,
	StorageSignedUrlInput,
	StorageSignedUrlOutput,
	StorageUploadInput,
	StorageUploadOutput,
} from '../../domain';

export class StorageRepositoryImpl implements StorageRepository {
	constructor(private readonly datasource: StorageDatasource) {}

	upload(input: StorageUploadInput): Promise<StorageUploadOutput> {
		return this.datasource.upload(input);
	}

	list(input: StorageListInput): Promise<StorageListedObject[]> {
		return this.datasource.list(input);
	}

	createSignedUrl(input: StorageSignedUrlInput): Promise<StorageSignedUrlOutput> {
		return this.datasource.createSignedUrl(input);
	}

	remove(input: StorageRemoveInput): Promise<StorageRemoveOutput> {
		return this.datasource.remove(input);
	}
}
