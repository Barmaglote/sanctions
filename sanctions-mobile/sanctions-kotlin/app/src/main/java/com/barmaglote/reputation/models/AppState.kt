package com.barmaglote.reputation.models

import com.barmaglote.reputation.enums.AppStates

abstract class AppState: IAppState {
    abstract val state: AppStates
}