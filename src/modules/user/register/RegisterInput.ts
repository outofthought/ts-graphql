import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";
import { PasswordMixin } from "../../shared/PasswordInput";
// import { OkMixin } from "./../../shared/OkMixin";

// @InputType()
@InputType({ isAbstract: true })
// 1.export class RegisterInput extends PasswordInput {
// 2.export class RegisterInput extends OkMixin(PasswordInput) {
// 3.export class RegisterInput extends OkMixin(PasswordMixin(class {})) {
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "email already in use" })
  email: string;
}
