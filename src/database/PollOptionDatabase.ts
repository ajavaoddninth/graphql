import { Collection } from "notarealdb";
import PollOption from "../entities/PollOption";
import Vote from "../entities/Vote";
import AbstractDatabase from "./AbstractDatabase";

export default class PollOptionDatabase extends AbstractDatabase<PollOption> {
    constructor (
        pollOptions: Collection<PollOption>,
        public voteDb: AbstractDatabase<Vote>
    ) {
        super(pollOptions);
    }
    
    public delete(id: string): PollOption {
        const pollOptionToDelete = this.rootCollection.get(id);

        this.rootCollection.delete(id);

        this.voteDb
            .filter(item => item.optionId === id)
            .map(item => this.voteDb.delete(item.id));

        return pollOptionToDelete;
    }
}