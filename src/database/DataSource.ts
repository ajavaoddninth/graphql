/**
 * Function interface for entity conditions.
 */
export interface Predicate<TEntity> {
    (entity: TEntity): boolean;
}

/**
 * Function interface for entity comparers.
 */
export interface Comparer<TEntity> {
    (first: TEntity, second: TEntity): number;
}

/**
 * Class interface for sources of entity data.
 */
export default interface DataSource<TEntity> {
    /**
     * Checks if entity with ID exists in source.
     * @param id ID of entity to look for
     * @returns true if exists, otherwise false
     */
    has(id: string): boolean;

    /**
     * Gets the entity that matched the input ID.
     * @param id ID of entity to look for
     * @returns Entity object if exists, otherwise undefined
     */
    get(id: string): TEntity | undefined;

    /**
     * Gets all the entities in this store
     * and optionally sorted based on given comparison.
     * @param sort Optional comparer function to sort entities
     * @returns List of all entities
     */
    list(sort?: Comparer<TEntity>): TEntity[];

    /**
     * Returns the number of entities that satisfy
     * the condition.
     * @param predicate Condition to check
     * @returns Number of entities that satisfy condition 
     */
    count(predicate: Predicate<TEntity>): number;

    /**
     * Finds the first instance of entity that satisfy
     * the condition.
     * @param predicate Condition to check
     * @returns First entity that satisfied the condition, otherwise undefined
     */
    find(predicate: Predicate<TEntity>): TEntity | undefined;

    /**
     * Returns list of entities that satisfy the condition,
     * and optionally sorted based on given comparison.
     * @param predicate Condition to check
     * @param sort Optional comparer function to sort entities
     */
    filter(predicate: Predicate<TEntity>, sort?: Comparer<TEntity>): TEntity[];

    /**
     * Creates an entity, and returns it.
     * @param entity Partial entity data
     * @returns Create entity
     */
    create(entity: Partial<TEntity>): TEntity;
 
    /**
     * Updates an entity, and returns it.
     * @param id ID of entity to update
     * @param data Update values
     * @returns Updated entity if exists, otherwise undefined
     */
    update(id: string, data: Partial<TEntity>): TEntity | undefined;

    /**
     * Deletes an entity, and returns it.
     * @param id ID of entity to delete.
     * @returns Deleted entity if exists, otherwise undefined
     */
    delete(id: string): TEntity | undefined;
}