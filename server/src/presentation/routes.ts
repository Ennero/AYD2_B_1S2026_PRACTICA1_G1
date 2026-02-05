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

import { Router } from "express";
import { Authroutes } from "./auth/routes";
import { UserRoutes } from "./user/routes";
import { FavoriteRoutes } from "./favorite/routes";
import { RecordRoutes } from "./record/routes";
import { PropertyRoutes } from "./property/routes";
import { InvitationRoutes } from "./invitation/routes";
import { ImageRoutes } from "./image/routes";

export class AppRoutes {
    
    static get routes(): Router {

        const router = Router();


        router.use('/api/auth', Authroutes.routes)
        router.use('/api/user', UserRoutes.routes)
        router.use('/api/favorite', FavoriteRoutes.routes)
        router.use('/api/record', RecordRoutes.routes)
        router.use('/api/property', PropertyRoutes.routes)
        router.use('/api/invitation', InvitationRoutes.routes)
        router.use('/api/image', ImageRoutes.routes)


        return router;
    }
    
}