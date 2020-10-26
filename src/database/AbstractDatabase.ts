import { Collection, Entity } from "notarealdb";
import DataSource, { Comparer, Predicate } from "./DataSource";

export default abstract class AbstractDatabase<TEntity extends Entity> implements DataSource<TEntity> {
    constructor(
        public rootCollection: Collection<TEntity>) {}

    public get(id: string): TEntity {
        return this.rootCollection.get(id);
    }

    public list(sort?: Comparer<TEntity>): TEntity[] {
        const allData = this.rootCollection.list();

        if (sort !== undefined) {
            return allData.sort(sort);
        }

        return allData;
    }

    public find(predicate: Predicate<TEntity>): TEntity | undefined {
        return this.rootCollection.list().find(predicate);
    }
    
    public filter(predicate: Predicate<TEntity>, sort?: Comparer<TEntity>): TEntity[] {
        const filteredData = this.rootCollection.list().filter(predicate);

        if (sort !== undefined) {
            return filteredData.sort(sort);
        }

        return filteredData;
    }

    public count(predicate: Predicate<TEntity>): number {
        return this.rootCollection.list().filter(predicate).length;
    }

    public create(entity: Partial<TEntity>): TEntity {
        const id = this.rootCollection.create(entity);

        return this.rootCollection.get(id);
    }

    public update(id: string, data: Partial<TEntity>): TEntity {
        const entityToUpdate = this.rootCollection.get(id);

        this.rootCollection.update({
            ...entityToUpdate,
            ...data
        });

        return this.rootCollection.get(id);
    }

    abstract delete(id: string): TEntity;
}