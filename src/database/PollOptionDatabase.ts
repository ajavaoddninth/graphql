import { Collection } from "notarealdb";
import PollOption from "../entities/PollOption";
import Vote from "../entities/Vote";
import AbstractDatabase from "./AbstractDatabase";

/**
 * `notarealdb` Poll Option Database.
 */
export default class PollOptionDatabase extends AbstractDatabase<PollOption> {
    constructor (
        pollOptions: Collection<PollOption>,
        public voteDb: AbstractDatabase<Vote>
    ) {
        super(pollOptions);
    }
    
    /** @inheritdoc */
    public delete(id: string): PollOption | undefined {
        const pollOptionToDelete = this.get(id);

        if (pollOptionToDelete) {
            this.rootCollection.delete(id);

            this.voteDb
                .filter(item => item.optionId === id)
                .map(item => this.voteDb.delete(item.id));
        }
        
        return pollOptionToDelete;
    }
}