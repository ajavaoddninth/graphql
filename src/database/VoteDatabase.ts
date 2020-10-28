import { Collection } from "notarealdb";
import Vote from "../entities/Vote";
import AbstractDatabase from "./AbstractDatabase";

/**
 * `notarealdb` Vote Database.
 */
export default class VoteDatabase extends AbstractDatabase<Vote> {
    constructor(
        votes: Collection<Vote>
    ) {
        super(votes);
    }
    
    /** @inheritdoc */
    public delete(id: string): Vote | undefined {
        const voteToDelete = this.get(id);

        if (voteToDelete) {
            this.rootCollection.delete(id);
        }
        
        return voteToDelete;
    }
}