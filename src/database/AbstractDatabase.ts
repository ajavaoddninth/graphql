import { Collection, Entity } from "notarealdb";
import DataSource, { Comparer, Predicate } from "./DataSource";

/**
 * Generic `notarealdb` Database
 * DO NOT MODIFY
 */
export default abstract class AbstractDatabase<TEntity extends Entity> implements DataSource<TEntity> {
    constructor(
        public rootCollection: Collection<TEntity>) {}

    /** @inheritdoc */
    public has(id: string): boolean {
        return !!this.get(id);
    }

    /** @inheritdoc */
    public get(id: string): TEntity | undefined {
        return this.rootCollection.get(id);
    }

    /** @inheritdoc */
    public list(sort?: Comparer<TEntity>): TEntity[] {
        const allData = this.rootCollection.list();

        return sort ? allData.sort(sort) : allData;
    }

    /** @inheritdoc */
    public find(predicate: Predicate<TEntity>): TEntity | undefined {
        return this.rootCollection.list().find(predicate);
    }
    
    /** @inheritdoc */
    public filter(predicate: Predicate<TEntity>, sort?: Comparer<TEntity>): TEntity[] {
        const filteredData = this.rootCollection.list().filter(predicate);

        return sort ? filteredData.sort(sort) : filteredData;
    }

    /** @inheritdoc */
    public count(predicate: Predicate<TEntity>): number {
        return this.rootCollection.list().filter(predicate).length;
    }

    /** @inheritdoc */
    public create(entity: Partial<TEntity>): TEntity {
        const id = this.rootCollection.create(entity);

        return this.rootCollection.get(id);
    }

    /** @inheritdoc */
    public update(id: string, data: Partial<TEntity>): TEntity | undefined {
        const entityToUpdate = this.get(id);

        if (entityToUpdate) {
            this.rootCollection.update({
                ...entityToUpdate,
                ...data
            });
        }

        return this.rootCollection.get(id);
    }

    /** @inheritdoc */
    abstract delete(id: string): TEntity | undefined;
}