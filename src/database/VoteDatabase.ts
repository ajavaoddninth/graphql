import { Collection } from "notarealdb";
import Vote from "../entities/Vote";
import AbstractDatabase from "./AbstractDatabase";

export default class VoteDatabase extends AbstractDatabase<Vote> {
    constructor(
        votes: Collection<Vote>
    ) {
        super(votes);
    }
    
    public delete(id: string): Vote {
        const voteToDelete = this.rootCollection.get(id);

        this.rootCollection.delete(id);

        return voteToDelete;
    }
}