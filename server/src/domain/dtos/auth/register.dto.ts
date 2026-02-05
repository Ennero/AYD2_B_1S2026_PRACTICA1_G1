


export class AuthRegisterDTO {

    private constructor(
        public readonly email: string,
        public readonly password: string,
    ){}


    static register( props: {[key:string]: any} ): [string | undefined, AuthRegisterDTO | undefined]{
        
        const { email, password } = props;

        if( !email ) {
            return ['Email is required', undefined];
        }

        if( !password ) {
            return ['Password is required', undefined];
        }

        const dto = new AuthRegisterDTO(
            String(email),
            String(password),
        );

        return [undefined, dto];
    }

}