import { Client, GatewayIntentBits, VoiceState, GuildMember, PermissionFlagsBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const mertplayrprightnowwhenimdoingthis = process.env.DISCORD_BOT_TOKEN;
const keanuisnotonline = process.env.SUPPORT_CHANNEL_ID || '';

const whypeoplesellcodelikethis = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
    ],
});

const originalNicknamesAreSuperCool: Map<string, string | null> = new Map();
const queuePositionTrackerVentiyyStyle: Map<string, number> = new Map();

function doesNameHaveQueueNumberLikeForReal(thisnameisepic: string | null): boolean {
    if (!thisnameisepic) return false;
    return /^\[\d+\]\s/.test(thisnameisepic);
}

function removeQueueNumberFromNameYeahBoi(thenametofix: string | null): string {
    if (!thenametofix) return '';
    return thenametofix.replace(/^\[\d+\]\s/, '');
}

function getAllMembersInSupportChannelSortedNicely(voicestatethingamajig: VoiceState): GuildMember[] {
    const thechannelyouknow = voicestatethingamajig.guild.channels.cache.get(keanuisnotonline);
    if (!thechannelyouknow || !thechannelyouknow.isVoiceBased()) return [];
    const memberswhoarewaiting: GuildMember[] = [];
    thechannelyouknow.members.forEach((memberalikelol) => {
        memberswhoarewaiting.push(memberalikelol);
    });
    return memberswhoarewaiting.sort((personone, persontwo) => {
        const positionofpersonone = queuePositionTrackerVentiyyStyle.get(personone.id) || Date.now();
        const positionofpersontwo = queuePositionTrackerVentiyyStyle.get(persontwo.id) || Date.now();
        return positionofpersonone - positionofpersontwo;
    });
}

async function updateAllNicknamesInQueueSuperEpicFunction(voicestateyeah: VoiceState): Promise<void> {
    const allmemberswaiting = getAllMembersInSupportChannelSortedNicely(voicestateyeah);
    let currentqueuenumberyay = 1;
    for (const membertofix of allmemberswaiting) {
        const originalnicknameofsomeperson = originalNicknamesAreSuperCool.get(membertofix.id);
        const basenametoworkwith = originalnicknameofsomeperson !== undefined 
            ? originalnicknameofsomeperson 
            : membertofix.displayName;
        const cleannamewithoutnumber = removeQueueNumberFromNameYeahBoi(basenametoworkwith);
        const newnicknamewithqueuenumber = `[${currentqueuenumberyay}] ${cleannamewithoutnumber || membertofix.user.username}`;
        try {
            if (membertofix.manageable) {
                await membertofix.setNickname(newnicknamewithqueuenumber.substring(0, 32));
                console.log(`Updated ${membertofix.user.username} to ${newnicknamewithqueuenumber}`);
            } else {
                console.log(`Cannot change nickname for ${membertofix.user.username} - no permission`);
            }
        } catch (erroralikelol) {
            console.error(`Error updating nickname:`, erroralikelol);
        }
        currentqueuenumberyay++;
    }
}


async function handleVoiceStateUpdateLikeABoss(
    oldstateyeahthisone: VoiceState,
    newstateyeahthisone: VoiceState
): Promise<void> {
    const thememberwearetalking = newstateyeahthisone.member || oldstateyeahthisone.member;
    if (!thememberwearetalking) return;
    const oldchannelid = oldstateyeahthisone.channel?.id;
    const newchannelid = newstateyeahthisone.channel?.id;
    const userJoinedSupportChannelOmg = newchannelid === keanuisnotonline && oldchannelid !== keanuisnotonline; 
    const userLeftSupportChannelSad = oldchannelid === keanuisnotonline && newchannelid !== keanuisnotonline;
    if (userJoinedSupportChannelOmg) {
        console.log(`${thememberwearetalking.user.username} joined ${keanuisnotonline}`);
        if (!originalNicknamesAreSuperCool.has(thememberwearetalking.id)) {
            originalNicknamesAreSuperCool.set(thememberwearetalking.id, thememberwearetalking.nickname);
        }
        queuePositionTrackerVentiyyStyle.set(thememberwearetalking.id, Date.now());
        await updateAllNicknamesInQueueSuperEpicFunction(newstateyeahthisone);
    }
    if (userLeftSupportChannelSad) {
        console.log(`${thememberwearetalking.user.username} left ${keanuisnotonline}`);
        const originalnametorestoreyay = originalNicknamesAreSuperCool.get(thememberwearetalking.id);
        try {
            if (thememberwearetalking.manageable) {
                await thememberwearetalking.setNickname(originalnametorestoreyay || null);
                console.log(`Restored${thememberwearetalking.user.username}'s nickname`);
            }
        } catch (errorohno) {
            console.error(`Error restoring nickname`, errorohno);
        }
        originalNicknamesAreSuperCool.delete(thememberwearetalking.id);
        queuePositionTrackerVentiyyStyle.delete(thememberwearetalking.id);
        await updateAllNicknamesInQueueSuperEpicFunction(oldstateyeahthisone);
    }
}

whypeoplesellcodelikethis.once('ready', () => {
    if (!keanuisnotonline) {
        console.error('No SUPPORT_CHANNEL_ID set in .env!');
    }
});

whypeoplesellcodelikethis.on('voiceStateUpdate', handleVoiceStateUpdateLikeABoss);

whypeoplesellcodelikethis.on('error', (erroroopsie) => {
    console.error('Bot error', erroroopsie);
});

if (!mertplayrprightnowwhenimdoingthis) {
    console.error('No bot token found Check your .env file');
    process.exit(1);
}

whypeoplesellcodelikethis.login(mertplayrprightnowwhenimdoingthis);
