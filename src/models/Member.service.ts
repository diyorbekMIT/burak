import { LoginInput, Member, MemberInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import { MemberType } from "../libs/enums/member.enum";
import Errors from "../libs/Errors";
import { HttpCode } from "../libs/Errors";
import { Message } from "../libs/Errors";
import * as bcryptjs from "bcryptjs";


class MemberService {
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel;
 
    }

    public async processSignup(input: MemberInput): Promise<Member>{
        const exist = await this.memberModel
          .findOne({memberType: MemberType.RESTAURANT})
          .exec();
        console.log("exist: ", exist);
        if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

        const salt = await bcryptjs.genSalt();
        input.memberPassword = await bcryptjs.hash(input.memberPassword, salt);

        try{
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result;
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async processLogin(input: LoginInput): Promise<Member> {
        // Find the member by their nickname and include the password field
        const member = await this.memberModel
            .findOne({ memberNick: input.memberNick }, { memberNick: 1, memberPassword: 1 })
            .exec();
    
        // If the member does not exist, throw a NOT_FOUND error
        if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_ERROR_NICK);
    
        // Compare the input password with the stored hashed password
        const isMatch = await bcryptjs.compare(input.memberPassword, member.memberPassword);
    
        // If the passwords do not match, throw an UNAUTHORIZED error
        if (!isMatch) throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    
        // Retrieve the full member data excluding the _id field
        const fullMemberData = await this.memberModel
            .findOne({ _id: member._id })
            .exec();
    
        // Return the full member data
        return fullMemberData;
    }
    
    
    
}

export default MemberService;