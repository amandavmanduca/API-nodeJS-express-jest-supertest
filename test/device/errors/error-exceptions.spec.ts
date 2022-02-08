import { InvalidFormatError, InvalidTypeError, NotFoundError } from "../../../src/utils/errorExceptions";
import "../../config"

describe("Error exceptions", () => {
    it("Should throw not found error", async () => {
        const t = () => {
            throw new NotFoundError();
        };
        expect(t).toThrow(NotFoundError);
    })
    it("Should throw invalid format error", async () => {
        const t = () => {
            throw new InvalidFormatError();
        };
        expect(t).toThrow(InvalidFormatError);
    })
    it("Should throw invalid type error", async () => {
        const t = () => {
            throw new InvalidTypeError();
        };
        expect(t).toThrow(InvalidTypeError);
    })
})
