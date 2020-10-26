export default interface DataSource<TEntity> {
    get(id: string): TEntity;

    all(sort?: (first: TEntity, second: TEntity) => number): TEntity[];

    count(predicate: (entity: TEntity) => boolean): number;

    find(predicate: (entity: TEntity) => boolean): TEntity | undefined;

    filter(predicate: (entity: TEntity) => boolean, sort?: (first: TEntity, second: TEntity) => number): TEntity[];

    create(entity: Partial<TEntity>): TEntity;
    
    update(id: string, data: Partial<TEntity>): TEntity;

    delete(id: string): TEntity;
}