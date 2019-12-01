import { Field, InputType } from "type-graphql";
import { PasswordMixin } from "../../shared/PasswordInput";

@InputType({ isAbstract: true })
// 1.export class ChangePasswordInput extends PasswordInput {
export class ChangePasswordInput extends PasswordMixin(class {}) {
  @Field()
  token: string;
}
