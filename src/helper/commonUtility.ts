import { HttpException, HttpStatus } from "@nestjs/common";
import { Constants } from "src/config/constants";
export class CommonUtility{
    public static checkIfUserAdmin(req) {
        if(req.user.role != Constants.ROLE.admin) {
            return false

        } else 
            return true

    }
}