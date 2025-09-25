export class UserLoginCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
