import {Category} from './Category.js'

export interface ITask{
    id: string;
    name: string;
    description: string;
    date: string;
    priority:string;
    category: Category;
}
