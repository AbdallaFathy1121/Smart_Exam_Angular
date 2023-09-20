import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Level } from "../models/level.model";
import { LevelsService } from "./levels.service";
import { inject } from "@angular/core";

export const LevelsResolverService: ResolveFn<Level[] | any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    levelsService: LevelsService = inject(LevelsService)
) => {
    const levels = levelsService.getLevels();
    return levels.length === 0 ? levelsService.fetchAllLevels() : levels;
}

