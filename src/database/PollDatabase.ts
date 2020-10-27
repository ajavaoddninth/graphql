import { Collection } from "notarealdb";
import Poll from "../entities/Poll";
import PollOption from "../entities/PollOption";
import Vote from "../entities/Vote";
import AbstractDatabase from "./AbstractDatabase";

/**
 * `notarealdb` Poll Database.
 * DO NOT MODIFY.
 */
export default class PollDatabase extends AbstractDatabase<Poll> {
    constructor(
        polls: Collection<Poll>,
        public pollOptionDb: AbstractDatabase<PollOption>,
        public voteDb: AbstractDatabase<Vote>
    ) {
        super(polls);
    }
    
    /** @inheritdoc */
    public delete(id: string): Poll | undefined {
        const pollToDelete = this.get(id);

        if (pollToDelete) {
            this.rootCollection.delete(id);

            this.pollOptionDb
                .filter(item => item.pollId === id)
                .map(item => this.pollOptionDb.delete(item.id));

            this.voteDb
                .filter(item => item.pollId === id)
                .map(item => this.voteDb.delete(item.id));
        }

        return pollToDelete;
    }
}