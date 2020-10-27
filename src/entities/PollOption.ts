/**
 * Poll option object type.
 * Fields in this object are trivial resolvers.
 */
export default interface PollOption {
    id: string;
    option: string;
    pollId: string;
}