// Used for merging the classes after getting selected by clsx

import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs) => {
    return twMerge(clsx(inputs))
}