import React from "react";
import { ErrorInfo } from "../ErrorInfo";

export class ErrorBoundary extends React.Component<unknown, { hasError: boolean }> {
    constructor(props = {}) {
        super(props);
        this.state = { hasError: false };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static getDerivedStateFromError(_error: any): { hasError: boolean } {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return { hasError: true };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    componentDidCatch(error: any, errorInfo: any): void {
        // делаем вид, что логируем
        console.error(error, errorInfo);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            // Можно отрендерить запасной UI произвольного вида
            return (
                <ErrorInfo errorName="Упс!" message="Что-то пошло не так" />
            );
        }

        return this.props.children;
    }
}
