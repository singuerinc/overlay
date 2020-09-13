import interactjs from 'interactjs';
import * as mousetrap from 'mousetrap';
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { remove, setScale } from '../../actions/onions';
import { track } from '../../utils/analytics';
import { Key } from '../../utils/Key';
import { move, resize, setInverted, setOpacity, toggleInverted } from '../core/reducer';
import { Coords } from '../helpers/Coords';
import { ARROW_KEYS, getPositionByKey } from '../helpers/getPositionByKey';
import { setPositionInDOM } from '../helpers/impure';
import {
    startListeningAndSwapZIndex,
    startListeningToIgnoreMouseEvents,
    stopListeningAndSwapZIndex,
    stopListeningToIgnoreMouseEvents,
    toTopZIndex
} from '../helpers/mouseEvents';
import { Size } from '../helpers/Size';
import { MiniToolboxWrapper } from '../miniToolbox/MiniToolboxWrapper';
import { Tool } from '../toolbox/Tool';
import { IOnionImage } from './IOnionImage';
import { OnionToolbox } from './OnionToolbox';

const REMOVE_KEYS = [Key.BACKSPACE, Key.DEL];

interface IState {
    opacity: number;
    inverted: boolean;
    visible: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
}

const OnionImageWrapper = styled<
    { locked: boolean; width: number; height: number; scale: number },
    'div'
>('div')`
    pointer-events: ${({ locked }) => (locked ? 'none' : 'all')};
    cursor: ${({ locked }) => (locked ? 'none' : 'move')};
    width: ${({ width, scale }) => width * scale}px;
    height: ${({ height, scale }) => height * scale}px;
    position: fixed;

    & ${Coords}, & ${Size} {
        opacity: 0;
        transition: opacity 100ms ease;
    }

    &:hover ${Coords}, &:hover ${Size} {
        opacity: 1;
    }

    & ${MiniToolboxWrapper} {
        bottom: -18px;
        opacity: 0;
        transition: all 100ms ease;
    }

    &:hover ${MiniToolboxWrapper} {
        bottom: -36px;
        opacity: 1;
    }
`;

interface IOnionImageElementProps {
    opacity: number;
    inverted: boolean;
    scale: number;
    width: number;
    height: number;
    visible: boolean;
}

const OnionImageElement = styled.img<IOnionImageElementProps>`
    opacity: ${({ opacity }) => opacity};
    filter: invert(${({ inverted }) => (inverted ? '100%' : '0%')});
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    width: ${({ width, scale }) => width * scale}px;
    height: ${({ height, scale }) => height * scale}px;
`;

const opacityNumberKeys = [
    Key.KEY_1,
    Key.KEY_2,
    Key.KEY_3,
    Key.KEY_4,
    Key.KEY_5,
    Key.KEY_6,
    Key.KEY_7,
    Key.KEY_8,
    Key.KEY_9,
    Key.KEY_0
];

const opacityLettersKeys = [Key.KEY_EQUAL, Key.KEY_PLUS, Key.KEY_MINUS, Key.KEY_UNDERSCORE];

const INVERT_KEYS = Key.I;

interface IProps {
    setScale: (id: string, scale: number) => void;
    remove: (id: string) => void;
}

class OnionImageView extends React.Component<IOnionImage & IProps, IState> {
    public static getDerivedStateFromProps(nextProps, prevState) {
        return { ...nextProps, ...prevState };
    }
    private el: React.RefObject<HTMLDivElement> = React.createRef();
    private image: React.RefObject<HTMLImageElement> = React.createRef();

    public componentDidMount() {
        const el = this.el.current as HTMLDivElement;
        const image = this.image.current as HTMLImageElement;

        toTopZIndex(el);

        startListeningToIgnoreMouseEvents(this.el.current);
        startListeningAndSwapZIndex(this.el.current);
        setPositionInDOM(this.el.current, this.state.x, this.state.y);

        image.onload = (event => {
            this.setState(resize(image.naturalWidth, image.naturalHeight));
        }).bind(this);

        el.addEventListener('mouseover', this.bindKeys);
        el.addEventListener('mouseout', this.unbindKeys);

        interactjs(el).draggable({
            onend: ({ target }) => {
                const x = parseInt(target.getAttribute('data-x'), 10);
                const y = parseInt(target.getAttribute('data-y'), 10);

                setPositionInDOM(el, x, y);

                this.setState(move(x, y));
            },
            onmove: ({ dx, dy, target }) => {
                if (this.props.locked) {
                    return;
                }

                const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;

                setPositionInDOM(target, x, y);

                this.setState(move(x, y));
            }
        });
    }

    public componentWillUnmount() {
        const el = this.el.current as HTMLDivElement;

        stopListeningToIgnoreMouseEvents(el);
        stopListeningAndSwapZIndex(el);
        this.unbindKeys();

        el.removeEventListener('moseover', this.bindKeys);
        el.removeEventListener('mouseout', this.unbindKeys);
    }

    public render() {
        const { locked, scale, src } = this.props;
        const { opacity, visible, inverted, x, y, height, width } = this.state;
        return (
            <OnionImageWrapper
                innerRef={this.el}
                width={width}
                height={height}
                locked={locked}
                scale={scale}
            >
                <OnionImageElement
                    innerRef={this.image}
                    src={src}
                    visible={visible}
                    opacity={opacity}
                    width={width}
                    height={height}
                    scale={scale}
                    inverted={inverted}
                />
                <Coords x={x} y={y} />
                <Size width={width * scale} height={height * scale} />
                <OnionToolbox
                    opacity={opacity}
                    inverted={inverted}
                    scale={scale}
                    setScale={value => this.props.setScale(this.props.id, value)}
                    setInverted={value =>
                        this.setState(setInverted(value), () => {
                            track('tool', Tool.ONION, `inverted/${this.state.inverted}`);
                        })
                    }
                    setOpacity={value => {
                        const newOpacity: number = parseFloat(value.toFixed(1));

                        this.setState(setOpacity(newOpacity), () => {
                            track('tool', Tool.ONION, `opacity/${this.state.opacity}`);
                        });
                    }}
                    remove={() => this.props.remove(this.props.id)}
                />
            </OnionImageWrapper>
        );
    }

    private bindKeys = () => {
        mousetrap.bind(opacityNumberKeys, ({ key }) => {
            const val = parseInt(key, 10) * 0.1;
            const opacity = parseFloat((val === 0 ? 1 : val).toFixed(1));
            this.setState(setOpacity(opacity));
        });

        mousetrap.bind(opacityLettersKeys, ({ keyCode }) => {
            let value = 0.05;
            if (keyCode === 45 || keyCode === 95) {
                // - 45 _ 95
                value *= -1;
            } else if (keyCode === 61 || keyCode === 43) {
                // = 61 + 43
                value *= 1;
            }

            this.setState(setOpacity(value));
        });

        mousetrap.bind(REMOVE_KEYS, () => {
            this.props.remove(this.props.id);
        });

        mousetrap.bind(INVERT_KEYS, () => {
            this.setState(toggleInverted);
        });

        mousetrap.bind(ARROW_KEYS, ({ shiftKey, key }) => {
            if (this.props.locked) {
                return;
            }

            const { x, y } = this.state;
            const value = shiftKey ? 10 : 1;

            this.setState(getPositionByKey(key, x, y, value), () => {
                setPositionInDOM(this.el.current, this.state.x, this.state.y);
            });
        });
    };

    private unbindKeys = () => {
        mousetrap.unbind([Key.BACKSPACE, Key.DEL]);
        mousetrap.unbind(opacityLettersKeys);
        mousetrap.unbind(opacityNumberKeys);
        mousetrap.unbind(INVERT_KEYS);
        mousetrap.unbind(ARROW_KEYS);
    };
}

const OnionImage = connect(null, {
    remove,
    setScale
})(OnionImageView);

export { OnionImage };
