export class ConstantUri {
    public static readonly baseUrl = 'http://localhost:3003';
    public static readonly registerUserUrl = `${ConstantUri.baseUrl}/auth/register`;
    public static readonly loginUserUrl = `${ConstantUri.baseUrl}/auth/login`;
    public static readonly citaUrl = `${ConstantUri.baseUrl}/teacher`;
    public static readonly consultUrl = `${ConstantUri.baseUrl}/menu`;
    public static readonly ipsUrl = `${ConstantUri.baseUrl}/student`;
    public static readonly medicoUrl = `${ConstantUri.baseUrl}/note`;
    public static readonly pacienteUrl = `${ConstantUri.baseUrl}/program`;
    public static readonly storageUrl = `${ConstantUri.baseUrl}/materia`;
    public static readonly usersUrl = `${ConstantUri.baseUrl}/users`;
}
