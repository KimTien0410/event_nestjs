export class User {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    public role: 'admin' | 'user',
    public password: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  isAdmin(): boolean {
    return this.role === 'admin'
  }
}
