export type Predicate<TEntity> = (entity: TEntity) => boolean;

export type Comparer<TEntity> = (first: TEntity, second: TEntity) => number;

export default interface DataSource<TEntity> {
    get(id: string): TEntity;

    list(sort?: Comparer<TEntity>): TEntity[];

    count(predicate: Predicate<TEntity>): number;

    find(predicate: Predicate<TEntity>): TEntity | undefined;

    filter(predicate: Predicate<TEntity>, sort?: Comparer<TEntity>): TEntity[];

    create(entity: Partial<TEntity>): TEntity;
    
    update(id: string, data: Partial<TEntity>): TEntity;

    delete(id: string): TEntity;
}