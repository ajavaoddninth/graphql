import { Collection, Entity } from "notarealdb";
import DataSource from "./DataSource";

export default abstract class AbstractDatabase<TEntity extends Entity> implements DataSource<TEntity> {
    constructor(
        public rootCollection: Collection<TEntity>) {}

    public get(id: string): TEntity {
        return this.rootCollection.get(id);
    }

    public all(sort?: (first: TEntity, second: TEntity) => number): TEntity[] {
        const allData = this.rootCollection.list();

        if (sort !== undefined) {
            return allData.sort(sort);
        }

        return allData;
    }

    public find(predicate: (entity: TEntity) => boolean): TEntity | undefined {
        return this.rootCollection.list().find(predicate);
    }
    
    public filter(predicate: (entity: TEntity) => boolean, sort?: (first: TEntity, second: TEntity) => number): TEntity[] {
        const filteredData = this.rootCollection.list().filter(predicate);

        if (sort !== undefined) {
            return filteredData.sort(sort);
        }

        return filteredData;
    }

    public count(predicate: (entity: TEntity) => boolean): number {
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