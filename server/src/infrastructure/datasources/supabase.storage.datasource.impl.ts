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

import { createClient } from '@supabase/supabase-js';
import { envs } from '../../config/environment';
import {
	StorageDatasource,
	StorageListInput,
	StorageListedObject,
	StorageRemoveInput,
	StorageRemoveOutput,
	StorageSignedUrlInput,
	StorageSignedUrlOutput,
	StorageUploadInput,
	StorageUploadOutput,
} from '../../domain';

export class SupabaseStorageDatasourceImpl implements StorageDatasource {
	private buildClient(accessToken?: string) {
		const token = accessToken?.trim() ? accessToken.trim() : undefined;
		const options: any = {
			auth: {
				persistSession: false,
			},
		};

		if (token) {
			options.global = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
		}

		return createClient(envs.SUPABASE_URL, envs.SUPABASE_ANON_KEY, options);
	}

	async upload(input: StorageUploadInput): Promise<StorageUploadOutput> {
		const supabase = this.buildClient(input.accessToken);
		const bucket = envs.BUCKET_NAME;

		const { data, error } = await supabase.storage.from(bucket).upload(input.objectPath, input.buffer, {
			contentType: input.contentType,
			upsert: input.upsert ?? false,
		});

		if (error || !data?.path) {
			throw new Error(error?.message ?? 'SUPABASE_STORAGE_UPLOAD_FAILED');
		}

		const publicResult = supabase.storage.from(bucket).getPublicUrl(data.path);
		const publicUrl = publicResult.data?.publicUrl ?? null;

		return { path: data.path, publicUrl };
	}

	async list(input: StorageListInput): Promise<StorageListedObject[]> {
		const supabase = this.buildClient(input.accessToken);
		const bucket = envs.BUCKET_NAME;

		const { data, error } = await supabase.storage.from(bucket).list(input.prefix, {
			limit: input.limit ?? 100,
			sortBy: { column: 'created_at', order: 'desc' },
		});

		if (error) {
			throw new Error(error.message);
		}

		return (data ?? []).map((o) => ({
			name: o.name,
			id: (o as any).id,
			createdAt: (o as any).created_at,
			updatedAt: (o as any).updated_at,
			metadata: (o as any).metadata,
		}));
	}

	async createSignedUrl(input: StorageSignedUrlInput): Promise<StorageSignedUrlOutput> {
		const supabase = this.buildClient(input.accessToken);
		const bucket = envs.BUCKET_NAME;

		const { data, error } = await supabase.storage.from(bucket).createSignedUrl(input.path, input.expiresInSeconds);

		if (error || !data?.signedUrl) {
			throw new Error(error?.message ?? 'SUPABASE_STORAGE_SIGNED_URL_FAILED');
		}

		return { signedUrl: data.signedUrl, expiresInSeconds: input.expiresInSeconds };
	}

	async remove(input: StorageRemoveInput): Promise<StorageRemoveOutput> {
		const supabase = this.buildClient(input.accessToken);
		const bucket = envs.BUCKET_NAME;

		const { data, error } = await supabase.storage.from(bucket).remove(input.paths);
		if (error) {
			throw new Error(error.message);
		}
		const removed = (data ?? []).map((item: any) => {
			if (typeof item === 'string') return item;
			if (item?.path) return { path: String(item.path) };
			if (item?.name) return { path: String(item.name) };
			return String(item);
		});

		return { removed };
	}
}
